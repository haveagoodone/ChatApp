var expect = chai.expect;

describe('newChatMessage', function () {
    it('should return an object with a message and an username', function () {
        expect(newChatMessage()).to.equal({
            message: 'this is a message',
            username: 'john'
        });
    });
});
