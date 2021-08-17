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
        { name: '요리', icon: '🍛', engName: 'cook' },
        { name: '게임', icon: '🎮', engName: 'game' },
        { name: '운동', icon: '💪', engName: 'exercise' },
        { name: '제과/제빵', icon: '🧁', engName: 'baking' },
        { name: '미술', icon: '🎨', engName: 'art' },
        { name: '수공예', icon: '🧶', engName: 'handCraft' },
        { name: '노래', icon: '🎤', engName: 'sing' },
        { name: '악기', icon: '🎸', engName: 'instrument' },
        { name: '프로그래밍', icon: '💻', engName: 'programmin' },
        { name: '영상', icon: '🎥', engName: 'video' },
        { name: '사진', icon: '📷', engName: 'picture' },
        { name: '명상', icon: '🧘‍♂️', engName: 'meditation' },
      ],
      {},
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
