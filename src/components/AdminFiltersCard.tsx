import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin-filters-card.css';
import { mdiEye, mdiMapCheckOutline } from '@mdi/js'; // Import icons
import Icon from '@mdi/react'; // Import Icon component
// import { useAuth } from '../context/authContext';
import Countdown from './Countdown';
import { Badge, Button, Card, Col, Row, Stack, Image, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { filter } from 'vue/types/umd';

type FilterState = {
  results: boolean;
  photoAlbum: boolean;
  deleted: boolean;
  edited: boolean;
};


const AdminFiltersCard: React.FC = () => {

  const [filters, setFilters] = useState<FilterState>({
    results: false,
    photoAlbum: false,
    deleted: false,
    edited: false,
  });

  const handleResultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      results: e.target.checked
    });
  };

  const handlePhotoAlbumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      photoAlbum: e.target.checked
    });
  };
  const handleDeletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      deleted: e.target.checked
    });
  };

  const handleEditedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      edited: e.target.checked
    });
  };
  return (
    <Card className="admin-filters-card">
      <Card.Title className="admin-filters-card__title" style={{margin: 0}}>admin</Card.Title>
    <Form className='filters-form'>
      <Form.Label>Не заполнено</Form.Label>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="results"
          label="Результаты"
          name="results"
          checked={filters.results}
          onChange={handleResultsChange}
          className="mb-2"
        />
        
        <Form.Check
          type="checkbox"
          id="photoAlbum"
          label="Фотоальбом"
          name="photoAlbum"
          checked={filters.photoAlbum}
          onChange={handlePhotoAlbumChange}
        />
      </Form.Group>
      <Form.Label>Статус</Form.Label>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="deleted"
          label="Удаленные"
          name="deleted"
          checked={filters.deleted}
          onChange={handleDeletedChange}
          className="mb-2"
        />
        
        <Form.Check
          type="checkbox"
          id="edited"
          label="Редактированные"
          name="edited"
          checked={filters.edited}
          onChange={handleEditedChange}
        />
      </Form.Group>
    </Form>
    </Card>
  );
};

export default AdminFiltersCard;