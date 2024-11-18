import { Game } from "../components/GameCard";

export class GameApi {
    async getAll(): Promise<Game[]> {
        
        try {
            const response = await fetch(`http://localhost:8080/games?page=1&per_page=100`, {
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
            const response = await fetch(`http://localhost:8080/game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(game),
                credentials: 'include'
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
            const response = await fetch(`http://localhost:8080/games/${game_id}/registrations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
                credentials: 'include'
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

type Team = {
    game_id: number,
    telegram: string,
    team_id: string | null,
    team_name: string,
    captain_name: string,
    phone: string,
    group_name: string,
    players_amount: number,
}