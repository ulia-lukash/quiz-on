import { GameApi } from "./game";

export class Api {

    game: GameApi

    constructor() {
        this.game = new GameApi()
    }

    async login(credentials: Credentials) {
        try {
            const response = await fetch(`http://localhost:8080/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(credentials),
            });
    
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();;
        } catch (error) {
            console.error('Error:', error);
            // throw error;
        }
    }

}

type Credentials = {
    login: string,
    password: string
}