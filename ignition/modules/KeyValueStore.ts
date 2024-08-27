import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MessageModule = buildModule("SampleKVSModule", (m) => {
    const smessages = m.contract("Messages");
    return {smessages};
});

export default MessageModule