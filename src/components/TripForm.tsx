import React from 'react';
import { Plane, Calendar, Tag } from 'lucide-react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { TripFormData } from '../types/trip';

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [formData, setFormData] = React.useState<TripFormData>({
    destination: '',
    duration: 3,
    tripType: 'leisure',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControl>
        <Box className="icon-wrapper">
          <Plane size={20} />
          <Typography variant="subtitle1">Destination</Typography>
        </Box>
        <TextField
          required
          fullWidth
          placeholder="e.g., Paris, France"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          margin="normal"
        />
      </FormControl>

      <FormControl>
        <Box className="icon-wrapper">
          <Calendar size={20} />
          <Typography variant="subtitle1">Duration (days)</Typography>
        </Box>
        <TextField
          type="number"
          required
          fullWidth
          inputProps={{ min: 1, max: 30 }}
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          margin="normal"
        />
      </FormControl>

      <FormControl fullWidth>
        <Box className="icon-wrapper">
          <Tag size={20} />
          <InputLabel id="trip-type-label">Trip Type</InputLabel>
        </Box>
        <Select
          labelId="trip-type-label"
          value={formData.tripType}
          onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
        >
          <MenuItem value="leisure">Leisure</MenuItem>
          <MenuItem value="adventure">Adventure</MenuItem>
          <MenuItem value="cultural">Cultural</MenuItem>
          <MenuItem value="romantic">Romantic</MenuItem>
          <MenuItem value="family">Family</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Generating Itinerary...' : 'Plan My Trip'}
      </Button>
    </Box>
  );
}