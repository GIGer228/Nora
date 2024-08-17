class Conversation {
    /**
     * 
     * @param {Array} userList - The list of conversation participants.
     */
    constructor(userIdList = new Array()) {
        this.userIdList = userIdList;
        this.hostId = userIdList[0];
        this.duration = 0;
        this.volume = 0;
        this.messageQueue = new Array();
    }
    /**
     * Adds several users to process messages from.
     * @param {Array} additionList - A list of users to join the conversation.
     */
    add_users(additionList) {
        this.userIdList = this.userIdList.concat(additionList);
    }
    /**
     * Excludes several users from message processing.
     * @param {Array} removalList - A list of users to remove from the conversation.
     */
    remove_users(removalList) {
        for (i = 0; i < this.userIdList.length; i++) {
            if (removalList.includes(this.userIdList[i])) {
                this.userIdList.splice(i, 1);
                i--;
            }
        }
    }
    /**
     * Adds a message to process.
     * @param {string} message - A message to add to conversation's queue.
     */
    queue_message(message) {
        this.volume++;
        this.messageQueue.push(message);
    }
}

module.exports = Conversation;