import Event from '../models/Event';

export const EVENTS = [
  new Event(
    'e1',
    'Poster Making',
    require('../assets/Poster.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'Poster Making is a creative competition where participants design visually compelling posters based on a given theme or topic. Participants use their artistic skills and creativity to convey messages, ideas, or concepts through images, graphics, and text elements on a poster canvas. The event encourages participants to showcase their creativity, imagination, and visual communication skills while addressing relevant themes or issues.',
    'The objective of Poster Making is to provide participants with a platform to express themselves artistically, communicate ideas effectively, and engage with diverse audiences through visual storytelling.Participants have the opportunity to explore various artistic techniques, experiment with different styles, and convey messages that resonate with viewers.',
    'Participants may be provided with specific themes, topics, or guidelines to follow during the poster creation process.Rules regarding poster dimensions, materials, and submission deadlines are communicated to ensure fairness and consistency across entries.Judges evaluate posters based on criteria such as creativity, originality, visual impact, relevance to the theme, and overall execution.'
  ),
  new Event(
    'e2',
    'Model Making',
    require('../assets/Model.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'Model Making is a hands-on competition where participants create physical models or prototypes of objects, structures, systems, or concepts based on predefined criteria or design challenges. Participants use various materials, tools, and techniques to construct three-dimensional representations that showcase their problem-solving abilities, craftsmanship, and innovation.',
    'The objective of Model Making is to challenge participants to translate abstract ideas or concepts into tangible, physical representations while demonstrating their technical skills, creativity, and attention to detail.Participants have the opportunity to apply principles of engineering, architecture, design, or other disciplines to construct models that meet specific requirements and criteria.',
    'Participants are provided with detailed instructions, specifications, or design briefs outlining the requirements and constraints for their models.Rules may specify materials, dimensions, construction methods, and presentation guidelines to ensure fairness and consistency.Judges assess models based on criteria such as accuracy, functionality, aesthetics, innovation, and adherence to the design brief.'
  ),
  new Event(
    'e3',
    'General Quiz',
    require('../assets/GeneralQuiz.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'The General Quiz is a knowledge-based competition where participants answer questions from a wide range of topics, including history, science, literature, current affairs, pop culture, and more. The quiz format typically consists of multiple rounds with questions of varying difficulty levels, challenging participants general knowledge, critical thinking, and recall abilities.',
    'The objective of the General Quiz is to test participants breadth of knowledge, awareness of diverse subjects, and ability to think quickly and strategically under pressure. Participants compete individually or in teams to answer questions accurately and efficiently, demonstrating their understanding of various topics and their capacity to perform well in a competitive environment.',
    'The General Quiz follows established rules and formats, with quizmasters or moderators presenting questions to participants and overseeing the competition proceedings. Rules may include guidelines on scoring, time limits, question formats, and eligibility criteria for participation. Participants are expected to adhere to fair play and sportsmanship principles throughout the quiz.'
  ),
  new Event(
    'e4',
    'Code Mosaic',
    require('../assets/CodeMosaic.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'Code Mosaic is a coding competition where participants collaborate to solve coding challenges or puzzles within a specified time frame. Participants work individually or in teams to write code that addresses given problems, tests their programming skills, and showcases their problem-solving abilities. The competition may involve tasks related to algorithmic problem-solving, software development, or coding proficiency in specific programming languages.',
    'The objective of Code Mosaic is to provide participants with opportunities to demonstrate their coding prowess, logical reasoning, and creativity in solving computational problems.Participants aim to write efficient, elegant code solutions that meet the requirements of the given challenges while adhering to coding best practices and standards.The competition fosters collaboration, innovation, and skill development among coding enthusiasts.',
    'Code Mosaic follows established rules and procedures governing coding competitions, including guidelines on task descriptions, submission formats, evaluation criteria, and code quality standards.Participants may be required to adhere to specific programming languages, coding paradigms, or development environments specified by the organizers.Judges assess code submissions based on factors such as correctness, efficiency, readability, and elegance.'
  ),
  new Event(
    'e5',
    'Technical Quiz',
    require('../assets/TechnicalQuiz.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'The Technical Quiz is a specialized competition that tests participants knowledge and expertise in technical subjects, such as engineering, computer science, mathematics, and applied sciences.The quiz format typically includes questions covering theoretical concepts, problem - solving techniques, and practical applications in various technical domains.Participants compete individually or in teams to answer questions accurately and demonstrate their proficiency in technical topics.',
    'The objective of the Technical Quiz is to assess participants understanding of technical principles, theories, and methodologies relevant to their field of study or expertise. Participants strive to demonstrate depth of knowledge, analytical thinking, and quick recall abilities while responding to quiz questions. The competition aims to promote learning, intellectual engagement, and camaraderie among participants interested in technical disciplines.',
    'The Technical Quiz follows established rules and formats common to quiz competitions, with quizmasters or moderators presenting questions and overseeing the proceedings.Rules may include guidelines on scoring, question formats, time limits, and eligibility criteria for participation.Participants are expected to adhere to fair play and sportsmanship principles throughout the quiz.'
  ),
  new Event(
    'e6',
    'TPP',
    require('../assets/Tpp.jpeg'),
    '19th January',
    '10:30 pm',
    100,
    'Thakur Polytechnic',
    'Technical Paper Presentation is an academic event where participants present original research, projects, or technical papers on specific topics or themes related to their field of study or interest. Participants prepare and deliver presentations that showcase their research findings, methodologies, innovations, or insights to an audience of peers, experts, and evaluators. The event encourages participants to communicate their ideas effectively, engage in scholarly discourse, and contribute to the body of knowledge in their respective fields.',
    'The objective of Technical Paper Presentation is to provide participants with a platform to share their research work, explore new ideas, and receive feedback from peers and experts in their field. Participants aim to deliver informative, engaging presentations that effectively communicate the significance, methodology, and findings of their research projects. The event promotes academic excellence, critical thinking, and effective communication skills among participants.',
    'Technical Paper Presentation follows established rules and protocols for academic conferences or symposiums, including guidelines on paper submission, presentation format, time limits, and evaluation criteria. Participants may be required to adhere to specific formatting styles, citation standards, and ethical guidelines for research conduct. Presentations are typically followed by question-and-answer sessions or discussions with the audience and panel of judges.'
  ),
  // new Event(
  //   "e11",
  //   "The Pitch Room",
  //   require("../assets/PitchRoom.jpeg"),
  //   "19th January",
  //   "10:30 pm",
  //   100,
  //   "Thakur Polytechnic",
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit quam, repellat ut quisquam reiciendis voluptatibus. Necessitatibus, quo. Voluptate delectus asperiores fuga, deleniti corrupti voluptatem.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit quam, repellat ut quisquam reiciendis voluptatibus. Necessitatibus, quo. Voluptate delectus asperiores fuga, deleniti corrupti voluptatem.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit."
  // ),
  // new Event(
  //   "e12",
  //   "Debate Comp",
  //   require("../assets/Quiz.jpeg"),
  //   "19th January",
  //   "10:30 pm",
  //   100,
  //   "Thakur Polytechnic",
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit quam, repellat ut quisquam reiciendis voluptatibus. Necessitatibus, quo. Voluptate delectus asperiores fuga, deleniti corrupti voluptatem.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit quam, repellat ut quisquam reiciendis voluptatibus. Necessitatibus, quo. Voluptate delectus asperiores fuga, deleniti corrupti voluptatem.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis impedit."
  // ),
];

export const departments = [
  { label: 'Computer Engineering', value: 'CO' },
  { label: 'Information Technology', value: 'IF' },
  { label: 'Mechanical Engineering', value: 'ME' },
  { label: 'Civil Engineering', value: 'CE' },
  { label: 'Electronics & Communication', value: 'EJ' },
  { label: 'Interior Designing', value: 'ID' },
];
