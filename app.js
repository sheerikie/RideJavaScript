const express = require('express');
const app = express();
app.use(express.json())

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const adminAuth = (req, res, next) => {
    const { username, password } = req.headers;
    if (username == 'admin' && password == 'password') {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  let drivers = [{ id: 1, name: 'John Doe', status: 'active' }, { id: 2, name: 'Jane Smith', status: 'active' }];

  app.post('/create-driver', adminAuth, (req, res) => {
    const { name } = req.body;
    console.log('name',name)
    const newDriver = { id: drivers.length + 1, name, status: 'active' };
    drivers.push(newDriver);
    res.status(201).json({ message: 'Driver created', driver: newDriver });
  });
  
  app.put('/suspend-driver/:id', adminAuth, (req, res) => {
    const { id } = req.params;
    const driverIndex = drivers.findIndex(driver => driver.id === parseInt(id));
    if (driverIndex !== -1) {
      drivers[driverIndex].status = 'suspended';
      res.status(200).json({ message: 'Driver suspended', driver: drivers[driverIndex] });
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  });
  let rides = [];

  app.post('/register-passenger', (req, res) => {
    const { name } = req.body;
    const newPassenger = { id: rides.length + 1, name };
    rides.push(newPassenger);
    res.status(201).json({ message: 'Passenger registered', passenger: newPassenger });
  });
  
  app.post('/start-ride/:passengerId/:driverId', adminAuth, (req, res) => {
    const { passengerId, driverId } = req.params;
    const passengerIndex = rides.findIndex(passenger => passenger.id === parseInt(passengerId));
    if (passengerIndex !== -1) {
      const driverIndex = drivers.findIndex(driver => driver.id === parseInt(driverId));
      if (driverIndex !== -1) {
        const ride = { passenger: rides[passengerIndex], driver: drivers[driverIndex], status: 'ongoing' };
        rides.push(ride);
        res.status(200).json({ message: 'Ride started', ride });
        } else {
        res.status(404).json({ message: 'Driver not found' });
        }
        } else {
        res.status(404).json({ message: 'Passenger not found' });
        }
        });
        
        app.put('/end-ride/:rideId', adminAuth, (req, res) => {
        const { rideId } = req.params;
        const rideIndex = rides.findIndex(ride => ride.id === parseInt(rideId));
        if (rideIndex !== -1) {
        rides[rideIndex].status = 'completed';
        res.status(200).json({ message: 'Ride ended', ride: rides[rideIndex] });
        } else {
        res.status(404).json({ message: 'Ride not found' });
        }
        });
        
        app.get('/rides', adminAuth, (req, res) => {
        res.status(200).json({ rides });
        });
        
        
        
              