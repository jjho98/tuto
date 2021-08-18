'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'category',
      [
        {
          name: '요리',
          icon: 'pot-steam-outline',
          engName: 'cook',
        },
        {
          name: '게임',
          icon: 'gamepad-variant-outline',
          engName: 'game',
        },
        {
          name: '운동',
          icon: 'dumbbell',
          engName: 'exercise',
        },
        {
          name: '제과/제빵',
          icon: 'muffin',
          engName: 'baking',
        },
        {
          name: '미술',
          icon: 'palette-outline',
          engName: 'art',
        },
        {
          name: '공예',
          icon: 'hammer-screwdriver',
          engName: 'craft',
        },
        {
          name: '노래',
          icon: 'microphone-variant',
          engName: 'sing',
        },
        {
          name: '악기',
          icon: 'guitar-acoustic',
          engName: 'instrument',
        },
        {
          name: '프로그래밍',
          icon: 'laptop-mac',
          engName: 'programmin',
        },
        {
          name: '영상',
          icon: 'video',
          engName: 'video',
        },
        {
          name: '사진',
          icon: 'camera',
          engName: 'picture',
        },
      ],
      {
        chartset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
