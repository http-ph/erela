"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
class Filters {
    /**
     * Creates an instance of filters
     * @param player
     */
    constructor(player) {
        this.player = player;
        this.options = {};
    }
    /** Checks if some filter is enabled */
    get enabled() {
        return !!Object.keys(this.options).length;
    }
    /** Gets a copy of active filters object */
    get active() {
        return Object.assign({}, this.options);
    }
    /** Sets ChannelMix filter */
    setChannelMix(options, apply = true) {
        if (!options)
            throw new TypeError("ChannelMixOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("ChannelMixOptions must be an object.");
        this.options.channelMix = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets Distortion filter */
    setDistortion(options, apply = true) {
        if (!options)
            throw new TypeError("DistortionOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("DistortionOptions must be an object.");
        this.options.distortion = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets the Equalizer */
    setEqualizer(options, apply = true) {
        if (!options)
            throw new TypeError("Equalizer must not be empty!");
        if (typeof options !== 'object' || !Array.isArray(options))
            throw new TypeError("Equalizer must be an Array.");
        if (options.length > 15)
            throw new RangeError("Equalizer Array size must be less or equal than 15");
        this.options.equalizer = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets Karaoke filter */
    setKaraoke(options, apply = true) {
        if (!options)
            throw new TypeError("KaraokeOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("KaraokeOptions must be an object.");
        this.options.karaoke = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets LowPass filter */
    setLowPass(options, apply = true) {
        if (!options)
            throw new TypeError("LowPassOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("LowPassOptions must be an object.");
        this.options.lowPass = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets rotation filter */
    setRotation(options, apply = true) {
        if (!options)
            throw new TypeError("RotationOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("RotationOptions must be an object.");
        this.options.rotation = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets timescale filter */
    setTimescale(options, apply = true) {
        if (!options)
            throw new TypeError("TimescaleOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("TimescaleOptions must be an object.");
        this.options.timescale = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets Tremolo filter */
    setTremolo(options, apply = true) {
        if (!options)
            throw new TypeError("TremoloOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("TremoloOptions must be an object.");
        this.options.tremolo = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets Vibrato filter */
    setVibrato(options, apply = true) {
        if (!options)
            throw new TypeError("VibratoOptions must not be empty!");
        if (typeof options !== 'object' || Array.isArray(options))
            throw new TypeError("VibratoOptions must be an object.");
        this.options.vibrato = options;
        if (apply)
            this.apply();
        return this;
    }
    /** Sets all filters */
    set(filters) {
        this.options = {};
        for (const [filter, config] of Object.entries(filters)) {
            if (!['channelMix', 'distortion', 'equalizer', 'karaoke', 'lowPass', 'rotation', 'timescale', 'tremolo', 'vibrato'].includes(filter))
                continue;
            this.options[filter] = config;
        }
        this.apply();
    }
    /** Clears all active filters */
    clear() {
        this.options = {};
        this.player.node.send({
            op: "filters",
            guildId: this.player.guild
        });
    }
    /** Sends filters payload to Lavalink Node */
    apply() {
        const payload = {
            op: "filters",
            guildId: this.player.guild
        };
        Object.assign(payload, this.options);
        if (this.options.equalizer)
            Object.assign(payload, { equalizer: this.options.equalizer.map((gain, band) => ({ band, gain })) });
        this.player.node.send(payload);
    }
}
exports.Filters = Filters;
