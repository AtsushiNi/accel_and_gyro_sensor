const socket = new WebSocket("ws://localhost:5001")
var g = [0, 0, 1]

socket.addEventListener("open", e => {
  console.log("open")
})

socket.addEventListener("message", e => {
  const data_array = e
    .data
    .split(';')
    .filter(data => data)
    .map(data => {
      const data_obj = {}
      data
        .split(',')
        .forEach(axis => {
          data_obj[axis.split(':')[0]] = axis.split(':')[1]
        })
      return data_obj
    })
  g = Object.values(data_array[0]).map(d => d*4/65536)
  console.log(g)
})

socket.addEventListener("close", e => {
  console.log("closed")
})

window.addEventListener('load', initThree)

function initThree() {
  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
    // canvas: document.querySelector('#myCanvas')
  document.body.appendChild( renderer.domElement )

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)
  camera.position.set(0, 0, +1000)

  // 箱を作成
  const geometry = new THREE.BoxGeometry(400, 400, 400)
  const material = new THREE.MeshNormalMaterial()
  const box = new THREE.Mesh(geometry, material)
  scene.add(box)

  tick()

  // 毎フレーム呼び出されるイベント
  function tick() {
    const euler = getEuler(g)

    box.rotation.x = euler[0]
    box.rotation.y = euler[1]
    box.rotation.z = euler[2]
    renderer.render(scene, camera)

    requestAnimationFrame(tick)
  }
}

function getEuler(accelVector) {
  const x = Math.atan2(accelVector[1], accelVector[2])
  const y = 0 // ヨー角は分からないので0としておく
  const z = -Math.atan2(-accelVector[0], Math.sqrt(accelVector[1] * accelVector[1] + accelVector[2] * accelVector[2]))
  return [x, y, z]
}
