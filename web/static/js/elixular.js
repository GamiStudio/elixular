import {Socket} from "deps/phoenix/web/static/js/phoenix";

class Elixular {
  constructor() {
    this._socket = new Socket("/socket");
    this._socket.connect();
    this._channel = this._socket.channel("regex:test", {});

    this._channel.join()
      .receive("ok", resp => { console.log("Joined succesfuly", resp); })
      .receive("error", resp => { console.log("Unabled to join", resp); });
  }

  test(pattern, flags = '', text = '') {
    return new Promise((resolve, reject) => {
      this._channel.push("start", { pattern: pattern, flags: flags, text: text })
        .receive("ok", resolve)
        .receive("error", reject);
    });
  }
}

export default Elixular;
