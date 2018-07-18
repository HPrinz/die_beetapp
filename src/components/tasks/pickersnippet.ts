  <Picker
          style={{ height: 50 }}
          selectedValue={task.bed}
          onValueChange={itemValue => this.props.setBedForTask(task.id, itemValue)}
        >
          {this.props.beds.map(i => (
            <Picker.Item key={i.id} label={i.name} value={i.id} />
          ))}
        </Picker>