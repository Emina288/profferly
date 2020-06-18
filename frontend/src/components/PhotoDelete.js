import React, { Component } from "react";
import axios from "axios";

class PhotoDelete extends Component {
  state = {
    photos: []
  };

  deletePhoto = id => {
    axios.delete("/api/photos/" + id).then(() => {
      this.setState({
        photos: this.state.photos.filter(photo => photo._id !== id)
      });
    });
  };

  componentDidMount() {
    axios.get("/api/photos").then(res => {
      this.setState({ photos: res.data });
    });
  }

  render() {
    return (
      <div >
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.photos.map(photo => (
                        <tr>
                            <td>{photo.photo_id}</td>
                            <td>
                            <a href={photo.fileLink}>
                                    View Photo
                            </a>
                     
                            <img src={photo.fileLink}></img>
                            </td>
                    

                            <td>
                                <button
                                    onClick={this.deletePhoto.bind(
                                        this,
                                        photo._id
                                    )}

                                >
                                    Delete Photo
                          </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

      </div>
    );
  }
}

export default PhotoDelete;
