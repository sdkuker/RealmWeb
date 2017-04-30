<td headers="name"><%- myCharactersName %></td>
<td headers="initiative"><%= initiative %></td>
<td headers="alertness"><%= alertness %></td>
<td headers="observation"><%= observation %></td>
<td headers="roundsStunned" contenteditable=<%= allowEditing %>><%= roundsStillStunned %></td>
<td headers="negativeModifier" contenteditable=<%= allowEditing %>><%= negativeModifier %></td>
<td headers="hitsStarting"><%= hitsAtStartOfRound %></td>
<td headers="hitsTakenThisRound" contenteditable=<%= allowEditing %>><%= hitsTakenDuringRound %></td>
<td headers="bleeding" contenteditable=<%= allowEditing %>><%= bleeding %></td>
<td headers="regeneration" contenteditable=<%= allowEditing %>><%= regeneration %></td>
<td headers="hitsRemaining"><%= hitsRemaining %></td>
