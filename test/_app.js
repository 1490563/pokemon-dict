(() => {
  describe("fetchPokeList", () => {
    var result;
    beforeEach(function (done) {
      fetchPokeList().then((pokeList) => {
        result = pokeList;
        done();
      });
    });
    it("should return array with length 20", function () {
      expect(result.length).toEqual(20);
    });
  });
})();
