
<% if (myDescription) { %>
    <li><%= myDescription %></li>
<%    } else {%>
        <li>Round <%= combatRoundNumber  %>  - Attacker: <%= attackerName  %> - <%= myCriticalHitDescription  %></li>
 <%   }  %>

