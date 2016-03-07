<div class="container">
    <div class="page-header">
        <h1>Character</h1>
    </div>
    <form role="form">
        <div class="form-group">
            <label for="playerName">Name:</label>
            <input type="text" class="form-control" id="playerName" value="<%- name %> ">
            <label for="observationSkill">Observation Skill:</label>
            <input type="text" class="form-control" id="observationSkill" value="<%- name %> ">

        </div>
    </form>
    <form>
        <div>
            <button id='saveButton' type='button' class="btn btn-default">Save</button>
            <button id='deleteButton' type='button' class="btn btn-default">Delete</button>
        </div>
    </form>
</div>