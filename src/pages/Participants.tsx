import React, { useState } from 'react';
import '../styles/participants.css'
import { useLocation } from 'react-router-dom';
import { mdiClockTimeThree, mdiMapMarker, mdiAlert } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component

// - Регистрация на игру
const Participants: React.FC= () => {

  const location = useLocation();
  // Access query parameters
  const queryParams = new URLSearchParams(location.search);
  const nid = queryParams.get('game_id'); // Get 'nid' from the query param
  const nidNumber = parseInt(nid ?? "", 10);

  const getParticipants = (data: any) => {
    if (data.length > 0) {
      let temp = ''
      for (const itemData of data) {
        const teamId = itemData.team_id ?? ''

        temp +=
          "<tr style='height: 70px; border: solid; border-width: 0.2px 0; border-color: rgba(255, 255, 255, 0.5);'>"
        temp += "<td style='padding: 10px;'>" + itemData.number + '</td>'
        temp += "<td style='padding: 10px;'>" + itemData.team_name + '</td>'
        temp += "<td style='padding: 10px;'>" + itemData.tg_contact + '</td>'
        temp += "<td style='padding: 10px;'>" + teamId + '</td>'
        temp +=
          "<td style='padding: 10px;'>" + itemData.captain_name + '</td>'
        temp += "<td style='padding: 10px;'>" + itemData.group_name + '</td>'
        temp += "<td style='padding: 10px;'>" + itemData.phone + '</td>'
        temp += "<td style='padding: 10px;'>" + itemData.amount + '</td>'
        temp +=
          "<td style='padding: 10px;'>" + itemData.registered_at + '</td>'
      }
    //   document.getElementById('rows').innerHTML = temp
    }
  }

  return(
    <div className="participants-div">
        <h1>УЧАСТНИКИ</h1>
        <div className="container">
        <table className="table">
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
            </tr>
            </thead>
            <tbody id="rows"></tbody>
        </table>
        </div>
    </div>
  )
}
export default Participants;