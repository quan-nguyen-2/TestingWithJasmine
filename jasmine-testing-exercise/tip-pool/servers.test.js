describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  it("should add another server to the server table on updateServerTable()", () => {
    serverId += 1;
    allServers["server" + serverId.toString()] = {
      serverName: serverNameInput.value,
    };
    updateServerTable();
    const row = document.getElementById("server" + serverId.toString());
    expect(row.children[0].innerText).toEqual("Alice");
  });

  afterEach(function () {
    // teardown logic
    delete allServers["server" + serverId];
    const row = document.getElementById("server" + serverId.toString());
    row.remove();
    serverId -= 1;
    serverNameInput.value = "";
  });
});
