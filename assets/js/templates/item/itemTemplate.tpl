<div class="container">
    <div class="page-header">
        <h1>Item</h1>
    </div>
    <form role="form">
        <div class="form-group">
            <label for="ItemName">Name:</label>
            <input type="text" class="form-control" id="ItemName" value="<%- name %> ">
            <label for="ItemWill">Will:</label>
            <input type="text" class="form-control" id="ItemWill" value="<%- will %> ">
            <label for="ItemWillModifier">Will Modifier:</label>
            <input type="text" class="form-control" id="ItemWillModifier" value="<%- willModifier %> ">
        </div>
    </form>
    <form>
        <div>
            <button id='saveButton' type='button' class="btn btn-default">Save</button>
            <button id='deleteButton' type='button' class="btn btn-default">Delete</button>
        </div>
    </form>
</div>