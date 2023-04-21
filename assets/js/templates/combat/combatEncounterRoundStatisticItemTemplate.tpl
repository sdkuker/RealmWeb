<td headers="name"><%- myCharactersName %></td>
<td headers="initialNumberOfCharacterClones"><%- initialNumberOfCharacterClones %></td>
<td headers="remainingNumberOfCharacterClones"><%- remainingNumberOfCharacterClones %></td>
<td headers="initiative"><%= initiative %></td>
<td headers="alertness"><%= alertness %></td>
<td headers="observation"><%= observation %></td>
<td headers="roundsStunned" contenteditable=<%= allowEditing %>><%= roundsStillStunned %></td>
<td headers="mustParry" contenteditable=<%= allowEditing %>><%= mustParry %></td>
<td headers="negativeModifier" contenteditable=<%= allowEditing %>><%= negativeModifier %></td>

<td headers="totalDefensiveBonusMinusAdrenalDefense"><%= totalDefensiveBonusMinusAdrenalDefense %></td>
<td headers="totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry"><%= totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry %></td>
<td headers="totalDefensiveBonus" data-toggle="tooltip" title="<%- totalDefensiveBonusDescription%>"><%= totalDefensiveBonus %></td>

<td headers="totalHitsPerClone"><%= totalHitsPerClone %></td>
<td headers="hitsStarting"><%= hitsAtStartOfRound %></td>
<td headers="hitsTakenThisRound" contenteditable=<%= allowEditing %>><%= hitsTakenDuringRound %></td>
<td headers="bleeding" contenteditable=<%= allowEditing %>><%= bleeding %></td>
<td headers="regeneration" contenteditable=<%= allowEditing %>><%= regeneration %></td>
<td headers="hitsRemaining"><%= hitsRemaining %></td>
