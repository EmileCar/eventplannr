import artImage from '../assets/img/eventPlaceholderImages/art.jpg';
import bbqImage from '../assets/img/eventPlaceholderImages/bbq.jpg';
import birthdayImage from '../assets/img/eventPlaceholderImages/birthday.jpg';
import carnavalImage from '../assets/img/eventPlaceholderImages/carnaval.jpg';
import cheeseAndWineImage from '../assets/img/eventPlaceholderImages/cheese&wine.jpg';
import conferenceImage from '../assets/img/eventPlaceholderImages/conference.jpg';
//import defaultImage from '../assets/img/eventPlaceholderImages/default.jpg';
import dinnerImage from '../assets/img/eventPlaceholderImages/dinner.jpg';
import drinksImage from '../assets/img/eventPlaceholderImages/drinks.jpg';
import expoImage from '../assets/img/eventPlaceholderImages/expo.jpg';
import festivalImage from '../assets/img/eventPlaceholderImages/festival.jpg';
import filmImage from '../assets/img/eventPlaceholderImages/film.jpg';
import galaImage from '../assets/img/eventPlaceholderImages/gala.jpg';
import memorialImage from '../assets/img/eventPlaceholderImages/memorial.jpg';
import musicImage from '../assets/img/eventPlaceholderImages/music.jpg';
import partyImage from '../assets/img/eventPlaceholderImages/party.jpg';
import presentationImage from '../assets/img/eventPlaceholderImages/presentation.jpg';


const keywordImageMap = {
    // BBQ MAPPINGS
    bbq: bbqImage,
    barbecue: bbqImage,
    // BIRTHDAY MAPPINGS
    birthday: birthdayImage,
    // CARNIVAL MAPPINGS
    carnival: carnavalImage,
    // CHEESE & WINE MAPPINGS
    cheese: cheeseAndWineImage,
    wine: cheeseAndWineImage,
    // CONFERENCE MAPPINGS
    conference: conferenceImage,
    // DINNER MAPPINGS
    dinner: dinnerImage,
    food: dinnerImage,
    // DRINKS MAPPINGS
    drinks: drinksImage,
    cocktail: drinksImage,
    // EXPO MAPPINGS
    expo: expoImage,
    exposition: expoImage,
    // FILM MAPPINGS
    film: filmImage,
    movie: filmImage,
    cinema: filmImage,
    // GALA MAPPINGS
    gala: galaImage,
    prom: galaImage,
    // MEMORIAL MAPPINGS
    memorial: memorialImage,
    // MUSIC MAPPINGS
    music: musicImage,
    concert: musicImage,
    // PARTY MAPPINGS
    party: partyImage,
    fiesta: partyImage,
    // ART MAPPINGS
    art: artImage,
    exhibit: artImage,
    exhibition: artImage,
    gallery: artImage,
    museum: artImage,
    // PRESENTATION MAPPINGS
    presentation: presentationImage,
    // FESTIVAL MAPPINGS
    festival: festivalImage,
    fair: festivalImage,
    fest: festivalImage,
};

const getDefaultImage = (title) => {
  const lowerCaseTitle = title.toLowerCase();

  for (const keyword in keywordImageMap) {
    if (lowerCaseTitle.includes(keyword)) {
      const image = keywordImageMap[keyword];
      return image;
    }
  }

  return partyImage;
};

export default getDefaultImage;
