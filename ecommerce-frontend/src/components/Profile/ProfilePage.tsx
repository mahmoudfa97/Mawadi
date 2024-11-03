import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface Profile {
  name: string;
  email: string;
  location: string;
  occupation: string;
  joinDate: string;
  bio: string;
  giftPreferences: string[];
  favoriteOccasions: string[];
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string[];
}

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
}

const ProfilePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    location: "New York, USA",
    occupation: "Software Engineer",
    joinDate: "January 2022",
    bio: "Passionate about creating meaningful digital experiences and solving complex problems through code.",
    giftPreferences: ["Books", "Tech Gadgets", "Gourmet Food"],
    favoriteOccasions: ["Birthdays", "Holidays", "Anniversaries"]
  });

  const [orders] = useState<Order[]>([
    { id: "ORD001", date: "2024-03-15", status: "Delivered", total: 89.99, items: ["Birthday Gift Set", "Personalized Card"] },
    { id: "ORD002", date: "2024-02-28", status: "Shipped", total: 129.99, items: ["Luxury Chocolate Box", "Wine Bottle"] },
    { id: "ORD003", date: "2024-01-10", status: "Processing", total: 59.99, items: ["Scented Candle Set"] },
  ]);

  const [favoriteItems] = useState<FavoriteItem[]>([
    { id: "ITEM001", name: "Deluxe Spa Gift Basket", price: 79.99 },
    { id: "ITEM002", name: "Personalized Photo Frame", price: 39.99 },
    { id: "ITEM003", name: "Gourmet Coffee Sampler", price: 49.99 },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handlePreferenceToggle = (preference: string, type: 'giftPreferences' | 'favoriteOccasions') => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].includes(preference)
        ? prev[type].filter(p => p !== preference)
        : [...prev[type], preference]
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Personal Info" />
                <Tab label="Orders" />
                <Tab label="Preferences" />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Avatar
                        src="/placeholder.svg?height=128&width=128"
                        sx={{ width: 128, height: 128, mb: 2 }}
                      />
                      {isEditing && (
                        <Button variant="outlined" size="small">
                          Change Avatar
                        </Button>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <List>
                      <ListItem>
                        <PersonIcon sx={{ mr: 2 }} />
                        <ListItemText
                          primary="Name"
                          secondary={
                            isEditing ? (
                              <TextField
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                variant="standard"
                              />
                            ) : (
                              profile.name
                            )
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <EmailIcon sx={{ mr: 2 }} />
                        <ListItemText
                          primary="Email"
                          secondary={
                            isEditing ? (
                              <TextField
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                variant="standard"
                              />
                            ) : (
                              profile.email
                            )
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <LocationIcon sx={{ mr: 2 }} />
                        <ListItemText
                          primary="Location"
                          secondary={
                            isEditing ? (
                              <TextField
                                name="location"
                                value={profile.location}
                                onChange={handleInputChange}
                                variant="standard"
                              />
                            ) : (
                              profile.location
                            )
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <WorkIcon sx={{ mr: 2 }} />
                        <ListItemText
                          primary="Occupation"
                          secondary={
                            isEditing ? (
                              <TextField
                                name="occupation"
                                value={profile.occupation}
                                onChange={handleInputChange}
                                variant="standard"
                              />
                            ) : (
                              profile.occupation
                            )
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <CalendarIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Member Since" secondary={profile.joinDate} />
                      </ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Bio
                    </Typography>
                    {isEditing ? (
                      <TextField
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {profile.bio}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(!isEditing)}
                    startIcon={<EditIcon />}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      sx={{ ml: 2 }}
                    >
                      Save Changes
                    </Button>
                  )}
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                {orders?.map((order) => (
                  <Accordion key={order.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Order #{order.id} - {order.date}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" gutterBottom>
                        <strong>Status:</strong> {order.status}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Total:</strong> ${order.total}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Items:</strong>
                      </Typography>
                      <List dense>
                        {order.items.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Gift Preferences
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {["Books", "Tech Gadgets", "Gourmet Food", "Fashion", "Home Decor", "Experiences"].map((pref) => (
                    <Chip
                      key={pref}
                      label={pref}
                      onClick={() => handlePreferenceToggle(pref, 'giftPreferences')}
                      color={profile.giftPreferences.includes(pref) ? "primary" : "default"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom>
                  Favorite Occasions
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {["Birthdays", "Holidays", "Anniversaries", "Weddings", "Graduations", "Just Because"].map((occasion) => (
                    <Chip
                      key={occasion}
                      label={occasion}
                      onClick={() => handlePreferenceToggle(occasion, 'favoriteOccasions')}
                      color={profile.favoriteOccasions.includes(occasion) ? "primary" : "default"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom>
                  Favorite Items
                </Typography>
                <Grid container spacing={2}>
                  {favoriteItems?.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: ${item.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfilePage;