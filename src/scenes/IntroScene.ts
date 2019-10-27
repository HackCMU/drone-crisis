import { Background } from '../components/Background';
import { Depth } from '../components/Depth';
import { getImage } from '../Image';
import { Scene } from './Scene';
import { TextButton } from '../components/TextButton';

export class IntroScene extends Scene {
    public sceneDidLoad() {
        super.sceneDidLoad();
        this.addComponent(
            new Background(Depth.SKY, getImage('sky')),
        );
        this.addComponent(
            new Background(Depth.BUILDING_2, getImage('building_total')),
        );
        this.addComponent(
            new TextButton(
                Depth.FRONT,
                this.dimensions.multiplying(0.5),
                'START',
                this.onButtonTapped,
            ),
        );
    }

    public onButtonTapped = (source: TextButton) => {
        
    }
}
