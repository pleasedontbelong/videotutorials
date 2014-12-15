describe('VideoManager', function(){
    describe('getUrl', function(){
        it('should fire the tick', function(){
            var VideoHandler = require("./mocks/video_handler.js");
            VideoHandler.prototype.getCurrentTime = sinon.stub().returns(10);

            var callback = sinon.stub();

            var ticks = ['0:10', '0:30', '1:10'];

            var manager = new VideoPlayerManager.Manager({
                'handler': VideoHandler,
                'ticks': ticks,
                'onTick': callback
            });
            manager.checkTicks();
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith('0:10', ticks)).to.be.true;
        });

        it('should fire the tick when manually moved', function(){
            var VideoHandler = require("./mocks/video_handler.js");
            var mocked_function = sinon.stub();
            mocked_function.onFirstCall().returns(30);
            mocked_function.onSecondCall().returns(15); // maybe manually moved by the user
            mocked_function.returns(false);
            VideoHandler.prototype.getCurrentTime = mocked_function;

            var callback = sinon.stub();

            var ticks = ['0:10', '0:30', '1:10'];

            var manager = new VideoPlayerManager.Manager({
                'handler': VideoHandler,
                'ticks': ticks,
                'onTick': callback
            });
            manager.checkTicks();
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith('0:30', ticks)).to.be.true;

            manager.checkTicks();
            expect(callback.calledWith('0:10', ticks)).to.be.true;
        });

        it('should fire last tick', function(){
            var VideoHandler = require("./mocks/video_handler.js");
            var mocked_function = sinon.stub().returns(80);

            VideoHandler.prototype.getCurrentTime = mocked_function;

            var callback = sinon.stub();

            var ticks = ['0:10', '0:30', '1:10'];

            var manager = new VideoPlayerManager.Manager({
                'handler': VideoHandler,
                'ticks': ticks,
                'onTick': callback
            });
            manager.checkTicks();
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith('1:10', ticks)).to.be.true;
        });

        it('should fire first tick', function(){
            var VideoHandler = require("./mocks/video_handler.js");
            var mocked_function = sinon.stub().returns(0);

            VideoHandler.prototype.getCurrentTime = mocked_function;

            var callback = sinon.stub();

            var ticks = ['0:00', '0:10', '0:30', '1:10'];

            var manager = new VideoPlayerManager.Manager({
                'handler': VideoHandler,
                'ticks': ticks,
                'onTick': callback
            });
            manager.checkTicks();
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith('0:00', ticks)).to.be.true;
        });
    });
});