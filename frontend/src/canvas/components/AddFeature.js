import "../style.css";
const AddFeature = () => {
  return (
    <div className="addFeature">
      <h5> Feature Request </h5>
      <p style={{ width: "70%", textAlign: "center" }}>
        Let us know what feature you'd like to see on our app
      </p>
      <div>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" width="100%" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeature;
