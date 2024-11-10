import { GameCardProps } from "../components/GameCard";

export class GameApi {
    async getAll(): Promise<GameCardProps[]> {
        
        try {
            const response = await fetch(`http://localhost:8080/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
    
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async create(game: Game) {
        try {
            const response = await fetch(`http://localhost:8080/create-game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(game),
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

    async getRegistrations(game_id: number) {
        try {
            const response = await fetch(`http://localhost:8080/registrations?game_id=${game_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
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

    async register(teamToRegister: Team) {
        try {
            const response = await fetch(`http://localhost:8080/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(teamToRegister),
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

type Game = {
    start_time: Date,
    location: string,
    name: string,
    main_amount: number,
    reserve_amount: number,
    registartion_open_time: Date
}

type Team = {
    game_id: number,
    telegram: string,
    team_id: string | null,
    team_name: string,
    captain_name: string,
    phone: string,
    group_name: string,
    players_amount: number
}