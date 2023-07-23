import * as THREE from 'three';
import {
  VRM,
  VRMExpressionPresetName,
  VRMLoaderPlugin,
  VRMUtils,
} from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { VRMAnimation } from '../../lib/VRMAnimation/VRMAnimation';
// import { VRMLookAtSmootherLoaderPlugin } from '@/lib/VRMLookAtSmootherLoaderPlugin/VRMLookAtSmootherLoaderPlugin';
// import { LipSync } from '../lipSync/lipSync';
import { VRMAnimation } from '~/lib/VRMAnimation/VRMAnimation';
import { EmoteController } from '~/features/emoteController/emoteController';
import { VRMLookAtSmootherLoaderPlugin } from '~/lib/VRMLookAtSmootherLoaderPlugin/VRMLookAtSmootherLoaderPlugin';
// import { Screenplay } from '../messages/messages';

export class Model {
  public vrm?: VRM | null;
  public mixer?: THREE.AnimationMixer;
  public emoteController?: EmoteController;
  public isSpeaking: boolean = false;

  private _lookAtTargetParent: THREE.Object3D;
  // private _lipSync?: LipSync;
  private currentEmotion: VRMExpressionPresetName = 'neutral';
  private mouthVolume: number = 1;

  constructor(lookAtTargetParent: THREE.Object3D) {
    this._lookAtTargetParent = lookAtTargetParent;
    // this._lipSync = new LipSync(new AudioContext());
    setInterval(() => {
      this.mouthVolume = 1 - this.mouthVolume;
    }, 250);
  }

  public async loadVRM(url: string): Promise<void> {
    const loader = new GLTFLoader();
    loader.register(
      (parser) =>
        new VRMLoaderPlugin(parser, {
          lookAtPlugin: new VRMLookAtSmootherLoaderPlugin(parser),
        })
    );

    const gltf = await loader.loadAsync(url);

    const vrm = (this.vrm = gltf.userData.vrm) as VRM;
    vrm.scene.name = 'VRMRoot';

    VRMUtils.rotateVRM0(vrm);
    this.mixer = new THREE.AnimationMixer(vrm.scene);

    this.emoteController = new EmoteController(vrm, this._lookAtTargetParent);
  }

  public unLoadVrm() {
    if (this.vrm) {
      VRMUtils.deepDispose(this.vrm.scene);
      this.vrm = null;
    }
  }

  public async loadAnimation(vrmAnimation: VRMAnimation): Promise<void> {
    const { vrm, mixer } = this;
    if (vrm == null || mixer == null) {
      throw new Error('You have to load VRM first');
    }

    const clip = vrmAnimation.createAnimationClip(vrm);
    const action = mixer.clipAction(clip);
    action.play();
  }

  public setEmotion(emotion: VRMExpressionPresetName) {
    this.currentEmotion = emotion;
  }

  public update(delta: number): void {
    if (this.isSpeaking) {
      this.emoteController?.playEmotion(this.currentEmotion);
      this.emoteController?.lipSync('aa', this.mouthVolume * 0.8);
    } else {
      this.emoteController?.playEmotion('neutral');
      this.emoteController?.lipSync('aa', 0);
    }

    this.emoteController?.update(delta);
    this.mixer?.update(delta);
    this.vrm?.update(delta);
  }
}
