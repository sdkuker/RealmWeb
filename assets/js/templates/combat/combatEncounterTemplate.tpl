<div class="container">
    <div class="page-header">
        <h1>Encounter - <%- encounterDescription %> </h1>
    </div>
    <form role="form">
        <div class="form-group">
            <label for="combatEncounterDescription">Description:</label>
            <input type="text" class="form-control" id="combatEncounterDescription" value="<%- encounterDescription %> ">
        </div>
    </form>
    <form>
        <div>
            <button id='saveButton' type='button' class="btn btn-default">Save</button>
            <button id='deleteButton' type='button' class="btn btn-default">Delete</button>
        </div>
    </form>
</div>