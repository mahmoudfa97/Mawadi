// UserActions.js
import React from 'react';
import { useState } from 'react'
import LoginModal from '../../Modals/LoginModal';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useAppSelector } from '../../store/hooks';
import OccasionCard from '../OccasionCard/OccasionCard';
const Occasions = () => {
    const [open, setOpen] = React.useState(false);
    const occasions = useAppSelector((state) => state.utils.occasions)

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <section className="container mx-auto px-4 my-12">
        <h2 className="text-3xl font-bold mb-6 text-right">المناسبات</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {occasions.map((occasion, index) => (
              <Link to={`/occasions/:${occasion.name}`} state={occasion}>
              <OccasionCard key={index} iname={occasion.name} icon={occasion.icon} />
            </Link>
          ))}
        </div>
      </section>
    );
};

export default Occasions;
