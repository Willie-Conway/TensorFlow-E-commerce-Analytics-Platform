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
    image: 'https://ss7.vzw.com/is/image/VerizonWireless/apple-studio-pro-wireless-headphones-sandstone-mqtr3ll-a-iset?$acc-lg$',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Smart watch with health tracking and notifications.',
    price: 199.99,
    image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111852_apple-watch-ultra.png',
  },
  {
    id: 3,
    name: 'Portable Speaker',
    description: 'Bluetooth portable speaker with deep bass.',
    price: 59.99,
    image: 'https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png',
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    description: 'Ergonomic gaming mouse with RGB lighting.',
    price: 49.99,
    image: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2017/06/2017-04-26-image-2.png',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    description: 'Backlit mechanical keyboard with blue switches.',
    price: 89.99,
    image: 'https://wallpapers.com/images/hd/r-g-b-mechanical-gaming-keyboard-8kivwy77v4lekqlm.jpg',
  },
  {
    id: 6,
    name: '4K Monitor',
    description: 'Ultra HD 27-inch 4K monitor with HDR support.',
    price: 299.99,
    image: 'https://cdn.arstechnica.net/wp-content/uploads/2022/03/UltraSharp-32-4K-USB-C-Hub-Monitor-U3222QE_2.png',
  },
  {
    id: 7,
    name: 'External SSD',
    description: '1TB portable SSD with USB-C connection.',
    price: 129.99,
    image: 'https://image-us.samsung.com/SamsungUS/home/computing/memory-and-storage/all/portable-solid-state-drives/mu-pa1t0b-am/gallery-7-31-2017/MU-PA1T0B_2.jpg?$product-details-jpg$',
  },
  {
    id: 8,
    name: 'Webcam 1080p',
    description: 'Full HD 1080p webcam with built-in microphone.',
    price: 39.99,
    image: 'https://dlcdnwebimgs.asus.com/files/media/9165af90-fde3-45b0-b229-88af5da8f8fe/websites/global/products/e3qwltu86agd77ck/img/fhd.png',
  },
  {
    id: 9,
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad for smartphones.',
    price: 29.99,
    image: 'https://d1bdmzehmfm4xb.cloudfront.net/optimized/3X/8/9/89848613a3020a33d3540119773ffa8af26b84c4_2_400x500.png',
  },
  {
    id: 10,
    name: 'Noise Cancelling Earbuds',
    description: 'Compact earbuds with active noise cancellation.',
    price: 149.99,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660803972366',
  },
  {
    id: 11,
    name: 'VR Headset',
    description: 'Immersive VR headset with motion tracking.',
    price: 399.99,
    image: 'https://www.pngkey.com/png/full/50-506986_oculus-rift-vr-headset-front-view-oculus-rift.png',
  },
  {
    id: 12,
    name: 'Smartphone Gimbal',
    description: '3-axis stabilizer for smooth video recording.',
    price: 89.99,
    image: 'https://rukminim2.flixcart.com/image/850/1000/k3t21zk0/gimbal/t/k/c/0-5-3-axis-handheld-smartphone-gimbal-stabilizer-zoom-capability-original-imafmuwr33r9dwrq.jpeg?q=90&crop=false',
  },
  {
    id: 13,
    name: 'Action Camera',
    description: 'Waterproof 4K action camera with wide-angle lens.',
    price: 149.99,
    image: 'https://www.pergear.com/cdn/shop/files/ActionCamera_1_800x.jpg?v=1699855810',
  },
  {
    id: 14,
    name: 'USB-C Hub',
    description: 'Multiport USB-C hub with HDMI, USB 3.0, and SD card reader.',
    price: 49.99,
    image: 'https://resources.legrand.us/1280_68KTbEYrfEQ0.jpg?1625706642',
  }
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
    <Box mt={6} mb={2}>
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
