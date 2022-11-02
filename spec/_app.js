(() => {
  describe("fetchPokeList", () => {
    it("should return array with length 20", async function () {
      const result = await fetchPokeList();
      console.log(result);
      expect(result.length).toEqual(20);
    });
  });
})();
