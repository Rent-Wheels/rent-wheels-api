const enum Roles {
  User = 3921,
  Admin = 9291,
  Renter = 6631,
}

const enum Availability {
  Available = 1,
  Unavailable = 0,
}

const enum Condition {
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
  Excellent = 'Excellent',
}

const enum Plan {
  Hourly = '/hr',
  Daily = '/day',
}

const enum CarType {
  Bus = 'Bus',
  SUV = 'SUV',
  Van = 'Van',
  Sedan = 'Sedan',
  Pickup = 'Pickup',
  Minivan = 'Minivan',
  Offroad = 'Offroad',
  Hatchback = 'Hatchback',
  Crossover = 'Crossover',
}

export { Roles, Availability, Condition, Plan, CarType }
