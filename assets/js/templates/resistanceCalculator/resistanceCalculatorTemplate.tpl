<div class="container">
    <div class="page-header">
        <h2>Resistance Calculator</h2>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Levels and Results</h3>
            </div>
            <div class="panel-body">
                <form class="form-inline" role="form">
                    <label for="attackerLevelInput">Attacker Level: </label>
                    <input id='attackerLevelInput' type='number' min='0'>
                    <label for="targetLevelInput">Target Level: </label>
                    <input id='targetLevelInput' type='number' min='0'>
                    <p></p>
                    <p><b>Target Resists At: </b><%- targetResistsAt %></p>
                </form>
            </div>
        </div>
    </div>
</div>