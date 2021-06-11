"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "homepages",
      [
        {
          byline: "Looking for brilliant people to work on my genius idea",
          experience:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus faucibus turpis quis fermentum. Etiam malesuada elit vitae est scelerisque facilisis. Donec vel euismod leo, id faucibus ex. Nullam tempus luctus neque, eget fermentum velit. Donec aliquam vestibulum pharetra. Praesent sem eros, viverra non justo at, iaculis sagittis odio. Aenean lorem mauris, sagittis et faucibus in, cursus eget justo. Vestibulum eleifend nunc suscipit fringilla eleifend. Aenean vitae eros faucibus, eleifend quam eget, ornare tellus. Nullam in dignissim ipsum. Ut auctor consectetur libero. Sed ut efficitur quam. Cras venenatis, est aliquam tristique elementum, turpis sem blandit tellus, id tristique velit nibh in magna. Nunc id ipsum dui. Cras at tellus venenatis, hendrerit urna nec, vehicula sem. Cras iaculis euismod pulvinar.",
          location: "Leiden",
          bio:
            "In in tincidunt purus, vel vestibulum diam. Nullam finibus viverra lacus, et scelerisque libero porta eget. Nulla eget sem id lectus scelerisque sollicitudin. Ut non ligula ex. Morbi non lorem aliquet, tristique eros id, faucibus diam. Ut fringilla, nibh pulvinar auctor ultricies, lacus tortor sollicitudin nulla, vitae tristique libero nisi id orci. Nulla at elit elementum urna dignissim tincidunt id et mauris. Morbi pharetra cursus pulvinar. Fusce ut tempor diam. Donec leo neque, tincidunt sed gravida vitae, molestie eu est. Donec sagittis nulla non tellus sodales condimentum. Aliquam elit lacus, bibendum ac ipsum in, tincidunt fringilla arcu. Nulla facilisis congue tortor a eleifend. Nullam malesuada massa felis, in tempus erat fermentum auctor. Aliquam ut molestie lorem. Nullam ullamcorper, neque non vulputate imperdiet, dui leo tincidunt est, eget feugiat felis urna a arcu.",
          idea: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          byline: "I'm a coding rockstar",
          experience:
            "Maecenas accumsan neque justo. Morbi mattis sodales lorem sed tincidunt. In hac habitasse platea dictumst. In sodales nisl et dolor consectetur fringilla vitae porta est. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ligula lorem, convallis ac diam id, accumsan ullamcorper libero.",
          location: "Amsterdam",
          bio:
            "Donec eleifend bibendum metus, ut bibendum ipsum efficitur ut. Fusce suscipit, ipsum ut interdum blandit, enim elit porta dui, accumsan tempus lectus eros non ante. Praesent et nisl eu dui cursus volutpat. In hac habitasse platea dictumst. Mauris nec felis id justo blandit porttitor. Maecenas tristique maximus eros, at iaculis libero dictum id. Proin luctus vehicula mi et porta. Etiam ligula dui, ultricies non auctor tempor, rutrum blandit lectus. Sed suscipit lorem leo, eu convallis arcu semper vitae. Duis eget risus vitae erat tincidunt posuere et vitae nunc. Praesent pharetra mollis scelerisque.",
          idea: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          byline: "I'm the creative type",
          experience:
            "Nam est enim, pellentesque ac semper nec, pretium id magna. Mauris at quam pellentesque, pellentesque libero ut, accumsan est. Integer tempus massa pellentesque risus placerat, eget convallis enim malesuada. Curabitur ultrices posuere fringilla. Etiam sodales erat vel turpis ultrices, et tempus diam aliquet. Mauris ut libero libero. Pellentesque eleifend commodo risus, nec maximus arcu facilisis et. Aliquam et dictum nulla, ut tempus lectus. Morbi libero enim, aliquet nec mattis tincidunt, gravida non tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          location: "Den Haag",
          bio:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus faucibus turpis quis fermentum. Etiam malesuada elit vitae est scelerisque facilisis. Donec vel euismod leo, id faucibus ex. Nullam tempus luctus neque, eget fermentum velit. Donec aliquam vestibulum pharetra. Praesent sem eros, viverra non justo at, iaculis sagittis odio. Aenean lorem mauris, sagittis et faucibus in, cursus eget justo. Vestibulum eleifend nunc suscipit fringilla eleifend. Aenean vitae eros faucibus, eleifend quam eget, ornare tellus. Nullam in dignissim ipsum. Ut auctor consectetur libero. Sed ut efficitur quam. Cras venenatis, est aliquam tristique elementum, turpis sem blandit tellus, id tristique velit nibh in magna. Nunc id ipsum dui. Cras at tellus venenatis, hendrerit urna nec, vehicula sem. Cras iaculis euismod pulvinar.",
          idea: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("homepages", null, {});
  },
};
