import 'phaser';

export class Align {

    private static __game: Phaser.Game;

    public static setGame(game: Phaser.Game) {
        Align.__game = game;
    }

    private static get game(): Phaser.Game {
        if (Align.__game == null) {
            throw new Error('Align was not initialized');
        }
        return Align.__game;
    }

    public static centerH(img: Phaser.GameObjects.Image) {
        img.x = Number(Align.game.config.width) / 2;
    }

    public static centerV(img: Phaser.GameObjects.Image) {
        img.y = Number(Align.game.config.height) / 2;
    }

    public static scaleToGame(img: Phaser.GameObjects.Image, percentage: number = 1, keepAspectRatio: boolean = true) {
        const scaleX = Number(Align.game.config.width) * percentage / img.width;
        const scaleY = Number(Align.game.config.height) * percentage / img.height;
        const scale = Math.min(scaleX, scaleY);
        if (keepAspectRatio) {
            img.setScale(scale);
        } else {
            img.setScale(scaleX, scaleY);
        }
    }

}