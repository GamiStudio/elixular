defmodule Elixular.RegexChannel do
  use Phoenix.Channel

  require Logger

  def join("regex:test", _message, socket) do
    {:ok, socket}
  end

  def handle_in("start", %{"pattern" => pattern}, socket) do
    Logger.debug pattern
    test_and_respond Regex.compile(pattern), socket
    {:noreply, socket}
  end

  def test_and_respond({:ok, regex}, socket) do
    result = Regex.run(regex, "lukas")
    push socket, "complete", %{result: result}
  end

  def test_and_respond({:error, error}, socket) do
    push socket, "error", %{
      msg: elem(error, 0),
      index: elem(error, 1)
    }
  end
end
