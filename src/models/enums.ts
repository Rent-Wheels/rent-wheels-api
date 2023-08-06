enum Roles {
  User = 3921,
  Admin = 9291,
  Renter = 6631,
}

enum Availability {
  Available = 1,
  Unavailable = 0,
}

enum Condition {
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
  Excellent = 'Excellent',
}

enum Plan {
  Daily = '/day',
  Hourly = '/hr',
}

enum DurationUnit {
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
}

enum CarType {
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

enum ReservationStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Ongoing = 'Ongoing',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Declined = 'Declined',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

export { Plan, Roles, CarType, Condition, Availability, DurationUnit, ReservationStatus }
