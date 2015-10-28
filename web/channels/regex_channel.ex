defmodule Elixular.RegexChannel do
  use Phoenix.Channel

  require Logger

  def join("regex:test", _message, socket) do
    {:ok, socket}
  end

  def handle_in("start", %{"pattern" => pattern}, socket) do
    Logger.debug pattern
    Regex.compile(pattern) |> test_and_respond socket
  end

  def test_and_respond({:ok, regex}, socket) do
    results = Regex.run(regex, "lukas")
    {:reply, {:ok, %{matches: results}}, socket}
  end

  def test_and_respond({:error, error}, socket) do
    {:reply,
      {:error, %{
          msg: elem(error, 0),
          index: elem(error, 1)
        }}, socket}
  end
end
