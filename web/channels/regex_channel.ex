defmodule Elixular.RegexChannel do
  use Phoenix.Channel

  def join("regex:test", _message, socket) do
    {:ok, socket}
  end
end
