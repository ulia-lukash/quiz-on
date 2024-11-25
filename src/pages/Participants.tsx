import React, { useRef, useState } from 'react';
import '../styles/participants.css'
import { useLocation } from 'react-router-dom';
import { mdiDelete, mdiMicrosoftExcel } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
import { Api } from '../api/api';
import { Table } from 'react-bootstrap';
import { utils, writeFileXLSX } from "xlsx";
// - Регистрация на игру
export default function Participants() {

  const location = useLocation();
  // Access query parameters
  const queryParams = new URLSearchParams(location.search);
  const nid = queryParams.get('game_id'); // Get 'nid' from the query param
  const nidNumber = parseInt(nid ?? "", 10);

  const api = new Api();
  const [participants, setParticipants] = React.useState<TeamResponse[]>([]);

  React.useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participants = await api.game.getRegistrations(nidNumber);
        setParticipants(participants);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };
    fetchParticipants();
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const registeredDate = (dateString: string) => {
    return new Date(dateString)
  }
  
  const formattedDate = (date: string) => {
    return new Intl.DateTimeFormat("ru-RU", dateOptions).format(registeredDate(date));
  }

  const exportTableToExcel = () => {
     const wb = utils.table_to_book(tbl.current);
     writeFileXLSX(wb, `Команды игры ${nidNumber}.xlsx`);
  }
  const tbl = useRef(null);

  return(
    <div>
        <h1>УЧАСТНИКИ</h1>
        <div className='w-100 d-flex button-container'>
          <button className="reg-button text-white mx-auto" onClick={exportTableToExcel}>
            <Icon path={mdiMicrosoftExcel} size={1} />
            Export
          </button>
        </div>
        <div className="container">
        <table className="participants-table" id="table" ref={tbl}>
            <thead>
            <tr>
                <th>№</th>
                <th>Команда</th>
                <th>Телеграм</th>
                <th>ID команды</th>
                <th>Капитан</th>
                <th>Группа</th>
                <th>Телефон</th>
                <th>Участников</th>
                <th>Время регистрации</th>
                <th></th>
            </tr>
            </thead>
            <tbody id="rows">
            {participants.map((team) => (
              <tr>
                <td>{team.number}</td>
                <td>{team.team_name}</td>
                <td>{team.telegram}</td>
                <td>{team.team_id}</td>
                <td>{team.captain_name}</td>
                <td>{team.group_name}</td>
                <td>{team.phone}</td>
                <td>{team.players_amount}</td>
                <td>{formattedDate(team.registered_at)}</td>
                <td>
                  <Icon path={mdiDelete} size={1} color="#e0ac59" />
                </td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}
type TeamResponse = {
  game_id: number,
  telegram: string,
  team_id: string | null,
  team_name: string,
  captain_name: string,
  phone: string,
  group_name: string,
  players_amount: number,
  number: number,
  registered_at: string
}