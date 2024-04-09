class Event {
  constructor(id, title, imageUrl, date, time, price, location, descrption, objective, rules) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.date = date;
    this.time = time;
    this.price = price;
    this.location = location;
    this.descrption = descrption;
    this.objective = objective;
    this.rules = rules;
  }
}

export default Event;
