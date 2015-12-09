defmodule Elixular.RegexChannel do
  use Phoenix.Channel

  def join("regex:test", _message, socket) do
    {:ok, socket}
  end

  def handle_in("start", payload, socket) do
    Regex.compile(payload["pattern"]) |>
      test_and_respond(payload["text"], socket)
  end

  def test_and_respond({:ok, regex}, text, socket) do
    matches = Regex.scan(regex, text)

    {:reply, {:ok, %{matches: with_range(regex, text, matches)}}, socket}
  end

  def test_and_respond({:error, error}, _text, socket) do
    {:reply,
      {:error, %{
          msg: elem(error, 0),
          index: elem(error, 1)
        }}, socket}
  end

  def with_range(regex, text, matches) do
    indexes = Regex.scan(regex, text, return: :index)

    Stream.with_index(matches) |> Enum.map(fn({match, i}) ->
      %{value: Enum.at(match, 0), range: range_at(indexes, i)} end)
  end

  def range_at(indexes, i) do
    range = Enum.at(Enum.at(indexes, i), 0)
    [elem(range, 0), elem(range, 1)]
  end
end
