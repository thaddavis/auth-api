var STATIC_CHANNELS = [
  {
    name: "Moises",
    email: "m@moises.tech",
    skills: ["React", "Machine Learning", "GraphQL", "AdTech"],
  },
  {
    name: "Simon",
    email: "simonaizpuruamgmt@gmail.com",
    skills: ["Data Science", "Python"],
  },
  {
    name: "Hyder",
    email: "hzubairi0277@gmail.com",
    skills: ["Contracts"],
  },
  {
    name: "Sayid",
    email: "thenextj.j.e@gmail.com",
    skills: ["Javascript", "Java", "Blockchain", "React"],
  },
  {
    name: "Keysel",
    email: "withthefritz@gmail.com",
    skills: ["Contracts"],
  },
  {
    name: "Charlie",
    email: "cohana@gmail.com",
    skills: ["Java"],
  },
  {
    name: "Tad",
    email: "thadduval.lavud@gmail.com",
    skills: ["AWS", "Full Stack", "Business Development", "Mobile Development", "Blockchain"],
  },
];

module.exports = async function (req, res, next) {
  try {
    res.status(200).json(STATIC_CHANNELS);
  } catch (e) {
    next(e);
  }
};
