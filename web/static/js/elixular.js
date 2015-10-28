import {Socket} from "deps/phoenix/web/static/js/phoenix";

class Elixular {
  constructor() {
    this._socket = new Socket("/socket");
    this._socket.connect();
    this._channel = this._socket.channel("regex:test", {});

    this._channel.join()
      .receive("ok", resp => { console.log("Joined succesffuly", resp) })
      .receive("error", resp => { console.log("Unabled to join", resp) });

    this._channel.on("complete", result => {
      console.log("complete", result);
    });
    this._channel.on("error", result => {
      console.log("error", result);
    });
  }

  test(pattern) {
    return new Promise((resolve, reject) => {
      this._channel.push("start", { pattern: pattern });
      resolve("testing...");
    });
  }
}

export default Elixular;
