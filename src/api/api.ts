import { GameApi } from "./game";

export class Api {

    game: GameApi

    constructor() {
        this.game = new GameApi()
    }

    async login(login: string, password: string) {
        try {
            const response = await fetch(`https://quiz-on.ru/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ login, password }),
                credentials: 'include'
            });
    
            if (response.ok) {
                localStorage.setItem('isAuthenticated', 'true')
            } else{
                localStorage.removeItem('isAuthenticated')
            }
            return response.ok
        } catch (error) {
            console.error('Error:', error);
            // throw error;
        }
    }

    async auth(): Promise<Boolean> {
        try {
            const response = await fetch(`https://quiz-on.ru/api/auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
                credentials: 'include'
            });
    
            if (response.ok) {
                localStorage.setItem('isAuthenticated', 'true')
            } else{
                localStorage.removeItem('isAuthenticated')
            }
            return response.ok
        } catch (error) {
            console.error('Error:', error);
            // throw error;
        }
        return false
    }
}

type Credentials = {
    login: string,
    password: string
}