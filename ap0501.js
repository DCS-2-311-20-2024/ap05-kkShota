//
// 応用プログラミング 第5回 課題1 (ap0501)
// G4M3042024 片野翔太
//
"use strict"; // 厳格モード

import * as THREE from 'three';
import { OrbitControls } from 'three/addons';
import GUI from 'ili-gui';

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    rotation: 2,
    axes: true,
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(4,2,6);
  camera.lookAt(0,1,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x406080);
  // レンダラに影の処理をさせる
  renderer.shadowMap.enabled = true;
  // Webページに描画領域を対応させる
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // カメラコントロール
   const orbitControls = new OrbitControls(camera, renderer.domElement);

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // テクスチャの読み込み
  const textureLoader = new THREE.TextureLoader();
  const texture1 = textureLoader.load("logo.png");
  const texture2 = textureLoader.load("myPict.png");//空欄
  // 立方体の作成
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshLambertMaterial();
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // 立方体にテクスチャを登録
   cubeMaterial.map = texture1;

  // 立方体の位置
  cube.position.y = 2;
  cube.position.x = -3;
  // 立方体は影を作る
  cube.castShadow = true; //修正箇所
  // シーンに立方体を加える
  scene.add(cube);

  // 球の作成
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);
  const sphereMaterial = new THREE.MeshPhongMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // 球にテクスチャを登録
  sphereMaterial.map = texture2; //空欄
  // 球の位置
  sphere.position.set(2.5, 2, -1);
  // 球は影を作る
  sphere.castShadow = true; //修正箇所
  // シーンに球を加える
  scene.add(sphere);
  // 平面の作成
  const circle = new THREE.Mesh(
    new THREE.CircleGeometry(20, 24),
    new THREE.MeshLambertMaterial({ color: 0x008010 }));
  circle.rotation.x = -Math.PI / 2;
  // 平面は影を受け止める
  circle.receiveShadow = true; //修正箇所
  // シーンに平面を加える
  scene.add(circle);

  // 光源の作成
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(3, 6, 8);
  light.castShadow = true;
  scene.add(light);

  // 自動販売機の作成
  // 素材に関する処理
  const venderTexture01 = textureLoader.load("vender01.jpg");
  const venderTexture02 = textureLoader.load("vender02.jpg");
  const venderMaterial = new THREE.MeshPhongMaterial({ color: 0xE8E7E5, shininess: 100 });
  const vender01Material = new THREE.MeshPhongMaterial({ map: venderTexture01 });
  const vender02Material = new THREE.MeshPhongMaterial({ map: venderTexture02 });
  // 自動販売機1号
  const vender01 = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.8, 0.9),
    [
      // 面ごとの素材の設定
      venderMaterial, // 左
      venderMaterial, // 右
      venderMaterial, // 上
      venderMaterial, // 下
      vender01Material, // 前 //修正箇所
      venderMaterial, // 後
    ]
  )
  // 自販機1の影の設定
  vender01.castShadow = true; //修正箇所
  vender01.receiveShadow = true; //修正箇所
  // 自販機1の位置の設定
  vender01.position.x= -0.6; //空欄箇所
  vender01.position.y= 0.9; //空欄箇所
  // 自販機1をシーンに追加する
   scene.add(vender01);

  // 自動販売機2号
  const vender02 = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 1.8, 0.9),
    [
      // 面ごとの素材の設定
      venderMaterial, // 左 //修正箇所
      venderMaterial, // 右　//修正箇所
      venderMaterial, // 上 //修正箇所
      venderMaterial, // 下　//修正箇所
      vender02Material, // 前 //修正箇所
      venderMaterial, // 後　//修正箇所
    ]
  )
  // 自販機2の影の設定
  vender02.castShadow = true; //修正箇所
  vender02.receiveShadow = true;//修正箇所
  // 自販機2の位置の設定
  vender02.position.x = 0.5; //修正箇所
  vender02.position.y = 0.9; //修正箇所
  // 自販機2をシーンに追加する
  scene.add(vender02); //修正箇所
  // 描画関数の定義

  function render() {
    // カメラ制御の更新
     orbitControls.update();
    // 座標軸のON/OFF
    axes.visible = controls.axes;
    // 物体の回転
    cube.rotation.y += 0.01 * controls.rotation;
    sphere.rotation.y = cube.rotation.y; //空欄箇所
    // 描画
    renderer.render(scene, camera);
    // アニメーション
    requestAnimationFrame(render);
  }

  // GUIコントローラ
  const gui = new GUI();
  gui.add(controls, "rotation", -10, 10);
  gui.add(controls, "axes");
  gui.add(controls, "reset");

  // 最初の描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
