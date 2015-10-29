defmodule Elixular.RegexChannel do
  use Phoenix.Channel

  require Logger

  def join("regex:test", _message, socket) do
    {:ok, socket}
  end

  def handle_in("start", payload, socket) do
    Regex.compile(payload["pattern"]) |> test_and_respond payload["text"], socket
  end

  def test_and_respond({:ok, regex}, text, socket) do
    results = Regex.scan(regex, text)
    {:reply, {:ok, %{matches: results}}, socket}
  end

  def test_and_respond({:error, error}, _text, socket) do
    {:reply,
      {:error, %{
          msg: elem(error, 0),
          index: elem(error, 1)
        }}, socket}
  end
end
