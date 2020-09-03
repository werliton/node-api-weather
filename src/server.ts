import './utils/module-alias'
import { Server } from '@overnightjs/core'
import { json, Application } from 'express'
import { ForeCastController } from './controllers/forecast'


export class SetupServer extends Server{
    constructor(private port = 3000){
        super()
    }

    /**
     * init
     */
    public init():void {
        this.setupExpress()
        this.setupControllers()
    }

    /**
     * getApp
     */
    public getApp(): Application {
        return this.app
    }

    private setupExpress(): void {
        this.app.use(json())
    }

    private setupControllers():void {
        const foreCastController = new ForeCastController()
        this.addControllers([foreCastController])
    }

}