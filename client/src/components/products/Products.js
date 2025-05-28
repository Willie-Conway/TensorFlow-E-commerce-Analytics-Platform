// client/src/components/products/Products.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High quality wireless headphones with noise cancellation.',
    price: 99.99,
    image: 'https://via.placeholder.com/200?text=Headphones',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Smart watch with health tracking and notifications.',
    price: 199.99,
    image: 'https://via.placeholder.com/200?text=Smart+Watch',
  },
  {
    id: 3,
    name: 'Portable Speaker',
    description: 'Bluetooth portable speaker with deep bass.',
    price: 59.99,
    image: 'https://via.placeholder.com/200?text=Speaker',
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    description: 'Ergonomic gaming mouse with RGB lighting.',
    price: 49.99,
    image: 'https://via.placeholder.com/200?text=Gaming+Mouse',
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Typography variant="body1">No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map(({ id, name, description, price, image }) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt={name}
                />
                <CardContent>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Products;
